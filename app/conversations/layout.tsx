import getConversations from '../actions/getConversations';
import getUsers from '../actions/getUser';
import SideBar from '../components/SlideBar';
import ConversationList from './ConversationList';

async function Layout({ children }: { children: React.ReactNode }) {
  const conversations = await getConversations();
  const users = await getUsers();
  return (
    <SideBar>
      <div className="h-full">
        <ConversationList users={users} initialItems={conversations} />
        {children}
      </div>
    </SideBar>
  );
}

export default Layout;
