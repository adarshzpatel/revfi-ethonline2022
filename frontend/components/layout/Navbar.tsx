import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import ConnectWallet from "./ConnectWallet";
import Logo from "./Logo";

type Props = {};

const Navlink = (props: { children: React.ReactNode } & LinkProps) => {
  const router = useRouter();

  const isCurrentPath = router.asPath === props.href

  return (
    <Link href={props.href}>
      <a className={`font-medium duration-300 ease-out py-2 px-3  hover:text-black  rounded-lg ${isCurrentPath ? " bg-gray-200 text-black" : " text-gray-500"}`}> {props.children}</a>
    </Link>
  );
};
const Navbar = (props: Props) => {
  return (
    <header className="px-8 py-4 sticky backdrop-blur-xl border-b border-gray-300">
      <nav className="flex max-w-screen-xl mx-auto justify-between">
        <div className="flex items-center space-x-4">
          <Logo />
          <Navlink href="/markets">Marketplace</Navlink>
          <Navlink href="/borrow">Borrow</Navlink>
        </div>
        {/* <Button loading variant="primary">Connect Wallet</Button> */}
        <ConnectWallet />
      </nav>
    </header>
  );
};

export default Navbar;
