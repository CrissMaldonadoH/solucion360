import Sidebar from "@/src/components/sidebar/Sidebar";
import Header from "@/src/components/header/Header";

export default function layoutApp({children}: Readonly<{children: React.ReactNode;}>){
    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <main className="flex-1 relative overflow-hidden">
                <div>
                    <Header />
                    {children}
                </div>
            </main>
        </div>
    );
}