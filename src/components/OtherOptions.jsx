import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Button } from "@/components/ui/button"

const OtherOptions = () => {
  return (
    <div className="mx-auto flex flex-col gap-4">
      <div className="flex text-xs gap-4">
        
        <div className="flex gap-4 text-sky-500">
        <p className="text-black al"><button className="align-middle">Copilot uses AI. Check for mistakes.</button></p>
          <p className="border-r pr-2 border-gray-400 "><button className="align-middle">Terms</button></p>
          <p className="border-r pr-2 border-gray-400 "><button className="align-middle">Privacy</button></p>
          <p className="border-r pr-2 border-white"><button className="align-middle">FAQs</button></p>
        </div>

        <Button variant="outline " className="rounded-full border border-sky-600 px-2 py-1 h-full text-xs hover:bg-sky-200">Try Copilot Pro</Button>
      </div>
      <br/>
      <br/>
      <p className="text-center font-semibold">Choose a conversation style</p>
      <div className="flex justify-center">

      <Menubar className="border-2 w-96 h-full flex justify-between">
      
        <MenubarMenu className="">
          <MenubarTrigger className="p-2 px-4 flex flex-col w-28">
            <span className="text-xs font-extrabold">more</span>Creative
          </MenubarTrigger>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="p-2 px-4 flex flex-col w-28">
            <span className="text-xs font-extrabold">more</span>Balanced
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="p-2 px-4 flex flex-col w-28">
            <span className="text-xs font-extrabold">more</span>Precised
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
      </div>
    </div>
  );
};

export default OtherOptions;
