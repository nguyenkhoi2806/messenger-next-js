import getUsers from "../actions/getUser";
import SideBar from "../components/SlideBar";
import UserList from "./UserList";

interface UserLayoutProps {
  children: React.ReactNode;
}
const UserLayout = async (props: UserLayoutProps) => {
  const { children } = props;
  const users = await getUsers();

  return (
    <>
      <SideBar>
        <div className="h-full">
          <UserList items={users} />
          {children}
        </div>
      </SideBar>
    </>
  );
};

export default UserLayout;
