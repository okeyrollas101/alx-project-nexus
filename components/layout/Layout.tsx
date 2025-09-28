import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";

interface LayoutProps {
    children: React.ReactNode;
}


const Layout: React.FC<LayoutProps> = ({ children }) => {
    const route = useRouter();
    const isDashboard = route.pathname.startsWith('/dashboard');

    if (isDashboard) {
        return <>{children}</>;
    }

    return (
        <>
          <Header />
            <hr className='text-gray-200'/>
            <main>{children}</main>
          <Footer />
        </>
    );
}   
export default Layout;