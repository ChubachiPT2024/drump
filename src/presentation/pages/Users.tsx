import { Header } from "../components/share/header";

import { Input } from "../shadcnUI/components/ui/input";
import { Label } from "../shadcnUI/components/ui/label";
import { Button } from "../shadcnUI/components/ui/button";

export const UsersPage = () => {
  return (
    <>
      <div className="min-h-screen">
        <Header />
        <div className="flex flex-col items-center min-h-screen WhiteDot space-y-8 pt-6">
          <div id="Hero" className="text-center text-black space-y-1 pt-16">
            <h1 className="text-4xl md:text-5xl xl:text-6xl">Add to User</h1>
            <h3 className="text-xs sm:text-sm md:text-base font-medium">
              Enter your username to start playing games
            </h3>
          </div>
          {/* TODO: ユーザーの追加を行うフォームを実装 */}
          <div id="input" className="flex flex-col space-y-4 w-[30%]">
            <Label className="text-left text-black">User Name</Label>
            <Input className="rounded-md" placeholder="User Name" />
            <Button type="submit" variant="success">
              Add
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
