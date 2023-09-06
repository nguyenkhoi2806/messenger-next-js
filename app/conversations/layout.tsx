import getConversations from "../actions/getConversations";
import SideBar from "../components/SlideBar";
import ConversationList from "./ConversationList";

async function Layout({ children }: { children: React.ReactNode }) {
  const conversations = await getConversations();
  return (
    <SideBar>
      <div className="h-full">
        <ConversationList initialItems={conversations} />
        {children}
      </div>
    </SideBar>
  );
}

export default Layout;
