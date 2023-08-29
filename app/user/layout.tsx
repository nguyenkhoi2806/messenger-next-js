import SideBar from "../components/SlideBar";

interface UserLayoutProps {
  children: React.ReactNode;
}
const UserLayout = async (props: UserLayoutProps) => {
  const { children } = props;
  return (
    <>
      <SideBar>
        <div className="h-full">{children}</div>
      </SideBar>
    </>
  );
};

export default UserLayout;
