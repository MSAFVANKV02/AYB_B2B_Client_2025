import PagesLayout, { PageLayoutHeader, PagesLayoutContent } from "@/layouts/Pages_Layout"

type Props ={
    title?:string
}

export default function PageOnBuild({title}:Props) {
  return (
    <div className="">

        <PagesLayout>
            <PageLayoutHeader>
                <h1 className="text-sm font-bold text-textGray">{title}</h1>
            </PageLayoutHeader>

            <PagesLayoutContent className="flex justify-center items-center">
            <div className="">
             Page on Build...
        </div>
            </PagesLayoutContent>
        </PagesLayout>

        
       
      {/* You can add your page content here */}
    </div>
  )
}