import { useState } from 'react';
import ConnectScreen from './components/ConnectScreen';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import InboxScreen from './components/InboxScreen';
import MessageView from './components/MessageView';
import ComposeModal from './components/ComposeModal';
import SettingsScreen from './components/SettingsScreen';
import { Message, Page, WalletConnection } from './types';

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    from: 'alice.sol',
    fromAddress: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    to: 'yourname.sol',
    toAddress: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
    subject: 'Welcome to mcg.mail!',
    body: `Hey there!

Welcome to the future of private, on-chain communication. I'm excited to be one of the first to send you a message on mcg.mail.

This email is:
- End-to-end encrypted using Arcium
- Verifiable on Solana blockchain
- Only readable by you with your Phantom wallet
- Censorship-resistant and truly private

Looking forward to connecting with you on this new platform!

Best,
Alice`,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isRead: false,
  },
  {
    id: '2',
    from: 'bob.sol',
    fromAddress: '8xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsV',
    to: 'yourname.sol',
    toAddress: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
    subject: 'Project collaboration opportunity',
    body: `Hi,

I've been following your work and I think there's a great opportunity for us to collaborate on a new DeFi project.

Would you be interested in discussing this further? Let me know your availability.

Thanks,
Bob`,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isRead: true,
  },
  {
    id: '3',
    from: 'charlie.sol',
    fromAddress: '9xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsW',
    to: 'yourname.sol',
    toAddress: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
    subject: 'Payment for services',
    body: `Hello,

Sending over the payment we discussed. Thanks for your excellent work on the project!

Best regards,
Charlie`,
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
    isRead: true,
    paymail: {
      amount: 10,
      currency: 'iUSD',
      claimed: false,
    },
  },
];

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('inbox');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [replyTo, setReplyTo] = useState<{ address: string; subject: string } | undefined>();
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);

  const wallet: WalletConnection = {
    publicKey: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
    solName: 'yourname.sol',
    connected: isConnected,
  };

  const handleConnect = () => {
    setIsConnected(true);
  };

  const handleMessageSelect = (message: Message) => {
    setSelectedMessage(message);
    setCurrentPage('message');

    if (!message.isRead) {
      setMessages(messages.map(m =>
        m.id === message.id ? { ...m, isRead: true } : m
      ));
    }
  };

  const handleBackToInbox = () => {
    setSelectedMessage(null);
    setCurrentPage('inbox');
  };

  const handleCompose = () => {
    setReplyTo(undefined);
    setIsComposeOpen(true);
  };

  const handleReply = () => {
    if (selectedMessage) {
      setReplyTo({
        address: selectedMessage.from,
        subject: selectedMessage.subject,
      });
      setIsComposeOpen(true);
    }
  };

  const handleSend = (to: string, subject: string, body: string) => {
    console.log('Sending message:', { to, subject, body });
    setIsComposeOpen(false);
  };

  if (!isConnected) {
    return <ConnectScreen onConnect={handleConnect} />;
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <TopBar wallet={wallet} />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onCompose={handleCompose}
        />

        <main className="flex-1 overflow-hidden bg-white">
          {currentPage === 'inbox' && (
            <InboxScreen
              messages={messages}
              onMessageSelect={handleMessageSelect}
            />
          )}

          {currentPage === 'message' && selectedMessage && (
            <MessageView
              message={selectedMessage}
              onBack={handleBackToInbox}
              onReply={handleReply}
            />
          )}

          {currentPage === 'sent' && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-slate-600 font-medium">Sent Messages</p>
                <p className="text-slate-400 text-sm mt-1">Your sent messages will appear here</p>
              </div>
            </div>
          )}

          {currentPage === 'spam' && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-slate-600 font-medium">Spam (V2)</p>
                <p className="text-slate-400 text-sm mt-1">Filtered spam messages will appear here</p>
              </div>
            </div>
          )}

          {currentPage === 'settings' && <SettingsScreen />}
        </main>
      </div>

      <ComposeModal
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        onSend={handleSend}
        replyTo={replyTo}
      />
    </div>
  );
}

export default App;
