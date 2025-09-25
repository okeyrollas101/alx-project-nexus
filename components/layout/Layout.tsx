import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
          <Header />
            <hr className='text-gray-200'/>
            <main className="min-h-screen">{children}</main>
          <Footer />
        </>
    );
}   
export default Layout;