import AuthOptions from '@/lib/utils/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import DrawerButton from '../button/drawer';
import ProfileButton from '../button/profile';
import NewButton from '../button/newButton';

const SignedInMenu = () => {
  return (
    <>
      <NewButton />
      <ProfileButton />
    </>
  );
};

const NotSignedInMenu = () => {
  return (
    <>
      <Link
        href={`/signin`}
        className="px-5 py-2 text-sm font-medium capitalize rounded-md hover:opacity-85">
        signin
      </Link>
      <Link
        href={`/register`}
        className="grid px-5 py-2 text-sm font-medium text-white capitalize bg-green-700 rounded-md place-items-center hover:opacity-85">
        register
      </Link>
    </>
  );
};

const NavbarComponent = async () => {
  const session = await getServerSession(AuthOptions);
  return (
    <nav className="flex items-center sticky top-0 z-50 bg-white justify-start gap-5 px-5 h-14 border-b border-stone-300 shadow-sm shadow-stone-200">
      <DrawerButton />
      <Link
        href={session ? '/home' : `/`}
        className="flex items-stretch justify-center rounded-md outline-none hover:opacity-85">
        <span className="text-xl font-semibold capitalize">i</span>
        <span className="text-xl font-semibold text-green-700 capitalize">
          demy
        </span>
      </Link>
      <div className="flex items-stretch justify-end gap-2 ml-auto">
        {session ? <SignedInMenu /> : <NotSignedInMenu />}
      </div>
    </nav>
  );
};

export default NavbarComponent;
