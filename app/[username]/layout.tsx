

import Nav from "@/app/components/Nav"
export default function NoteLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div>
            <Nav/>
            <div className=" mt-9">
            {children}
            </div>
        </div>
    )
  }