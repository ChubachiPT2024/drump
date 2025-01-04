import { CreateUserForm } from "../components/users/create-user-form";
import { Header } from "../components/share/header";

import { Toaster } from "../shadcnUI/components/ui/sonner";

export const UsersPage = () => {
  return (
    <>
      <div className="min-h-screen">
        <Header />
        <div className="flex flex-col items-center min-h-screen WhiteDot space-y-8 pt-6">
          <div id="Hero" className="text-center text-black space-y-1 pt-16">
            <h1 className="text-4xl md:text-5xl xl:text-6xl">Register User</h1>
            <h3 className="text-xs sm:text-sm md:text-base font-medium">
              Enter your username to start playing games
            </h3>
          </div>
          <CreateUserForm />
        </div>
      </div>
      <Toaster />
    </>
  );
};
