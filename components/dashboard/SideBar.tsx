import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/userSlice";
import Link from "next/link";
import { navLinkProps } from "@/constants";

function SidebarNav({ navLinks }: { navLinks: navLinkProps[] }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // 1. Clear local storage and cookies
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    // 2. Dispatch redux logout
    dispatch(logout());

    // 3. Redirect & force refresh
    router.push("/");
    window.location.reload(); // 🔄 refresh the app completely
  };

  return (
    <nav className="p-5">
      {navLinks.map((link) => (
        <Link
          key={link.name}
          href={link.path}
          className="flex items-center gap-3 p-3 rounded hover:bg-[#A95F21]"
        >
          {<link.icon />}
          <span>{link.name}</span>
        </Link>
      ))}

      <div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 rounded bg-red-500 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default SidebarNav;