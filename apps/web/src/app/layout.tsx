import '@/lib/api/interceptors';
import { NotificationProvider } from '@/providers/notification-provider';
import { QueryProvider } from '@/providers/query-provider';
import './globals.css';


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        
        <html lang="en">
            <body className="min-h-full flex flex-col">
                <QueryProvider>
                    <NotificationProvider>
                        {children}
                    </NotificationProvider>
                </QueryProvider>
            </body>
        </html>
    );
}
