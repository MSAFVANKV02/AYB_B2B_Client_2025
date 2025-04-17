import { Separator } from '@/components/ui/separator'
import SettingsLayout from '../layout'
import ChatBot from './ChatBot'


export default function ChatPage() {
  return (
    <SettingsLayout>
        <div>
       
          <div className="mx-h-[70vh] overflow-y-auto bg-white rounded-lg md:flex">
            <div className="md:flex-1">
            <div className="flex flex-col md:ml-5">
         <span className='text-black'>Chat With Us</span>
         <span className=''>Last seen 45 minutes ago</span>
         </div>

         <Separator className='my-5 w-[95%] mx-auto'/>

            <ChatBot/>       
            </div>
           <img src="/chat/Frame 2899.png" alt="" className='xl:block hidden' />
          </div>
       
        </div>
  
    </SettingsLayout>
  )
}