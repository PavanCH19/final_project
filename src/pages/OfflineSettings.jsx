import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Download,
    RefreshCw,
    Wifi,
    WifiOff,
    Loader
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const OfflineSettings = () => {
    const [offlineMode, setOfflineMode] = useState(false);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [downloadProgress, setDownloadProgress] = useState({});
    const [syncProgress, setSyncProgress] = useState(0);
    const [isDownloading, setIsDownloading] = useState({});
    const [isSyncing, setIsSyncing] = useState(false);
    const [lastSync, setLastSync] = useState(new Date(Date.now() - 2 * 60 * 60 * 1000)); // 2 hours ago
    const { toast } = useToast();

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const downloadContent = async (type, label) => {
        setIsDownloading(prev => ({ ...prev, [type]: true }));
        setDownloadProgress(prev => ({ ...prev, [type]: 0 }));

        for (let i = 0; i <= 100; i += 10) {
            await new Promise(resolve => setTimeout(resolve, 200));
            setDownloadProgress(prev => ({ ...prev, [type]: i }));
        }

        setIsDownloading(prev => ({ ...prev, [type]: false }));
        toast({
            title: "Download Complete",
            description: `${label} downloaded successfully for offline use.`,
        });
    };

    const syncData = async () => {
        if (!isOnline) {
            toast({
                title: "No Internet Connection",
                description: "Please check your connection and try again.",
                variant: "destructive",
            });
            return;
        }

        setIsSyncing(true);
        setSyncProgress(0);

        for (let i = 0; i <= 100; i += 5) {
            await new Promise(resolve => setTimeout(resolve, 100));
            setSyncProgress(i);
        }

        setLastSync(new Date());
        setIsSyncing(false);
        toast({
            title: "Sync Complete",
            description: "All offline data has been synchronized.",
        });
    };

    const formatLastSync = (date) => {
        if (!date) return "Never";
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        if (diffHours > 0) return `${diffHours}h ${diffMinutes}m ago`;
        return `${diffMinutes}m ago`;
    };

    const downloadItems = [
        { key: 'questions', label: 'Interview Questions', size: '2.3 MB' },
        { key: 'resume', label: 'Resume Templates', size: '1.8 MB' },
        { key: 'tips', label: 'Interview Tips', size: '0.9 MB' },
        { key: 'companies', label: 'Company Data', size: '4.1 MB' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900">Offline Settings</h1>
                    <p className="text-gray-600">Manage your offline interview preparation content</p>
                </div>

                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                {isOnline ? (
                                    <Wifi className="h-5 w-5 text-green-600" />
                                ) : (
                                    <WifiOff className="h-5 w-5 text-red-600" />
                                )}
                                <CardTitle className="text-lg">Connection Status</CardTitle>
                            </div>
                            <Badge variant={isOnline ? "default" : "destructive"}>
                                {isOnline ? "Online" : "Offline"}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600">Enable offline mode to access content without internet</p>
                            <Switch
                                checked={offlineMode}
                                onCheckedChange={setOfflineMode}
                                aria-label="Toggle offline mode"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Download className="h-5 w-5" />
                            <span>Download Content</span>
                        </CardTitle>
                        <CardDescription>
                            Download content for offline access. Total storage: 9.1 MB
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {downloadItems.map((item) => (
                            <div key={item.key} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium">{item.label}</span>
                                        <span className="text-sm text-gray-500">{item.size}</span>
                                    </div>
                                    {isDownloading[item.key] && (
                                        <Progress value={downloadProgress[item.key]} className="h-2" />
                                    )}
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="ml-4"
                                    onClick={() => downloadContent(item.key, item.label)}
                                    disabled={isDownloading[item.key]}
                                >
                                    {isDownloading[item.key] ? (
                                        <Loader className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Download className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <RefreshCw className="h-5 w-5" />
                            <span>Data Synchronization</span>
                        </CardTitle>
                        <CardDescription>
                            Sync your offline progress and data when online
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Last sync: {formatLastSync(lastSync)}</p>
                                <p className="text-sm text-gray-600">Your offline progress is up to date</p>
                            </div>
                            <Button
                                onClick={syncData}
                                disabled={!isOnline || isSyncing}
                                className="flex items-center space-x-2"
                            >
                                {isSyncing ? (
                                    <Loader className="h-4 w-4 animate-spin" />
                                ) : (
                                    <RefreshCw className="h-4 w-4" />
                                )}
                                <span>{isSyncing ? "Syncing..." : "Sync Now"}</span>
                            </Button>
                        </div>

                        {isSyncing && (
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Syncing progress...</span>
                                    <span>{syncProgress}%</span>
                                </div>
                                <Progress value={syncProgress} className="h-2" />
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Sync History</CardTitle>
                        <CardDescription>Recent synchronization activity</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[
                                { action: "Resume data synced", time: "2 hours ago" },
                                { action: "Interview responses uploaded", time: "1 day ago" },
                                { action: "Question sets downloaded", time: "2 days ago" },
                                { action: "Profile updates synced", time: "3 days ago" },
                            ].map((item, index) => (
                                <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                                    <div>
                                        <p className="font-medium text-sm">{item.action}</p>
                                        <p className="text-xs text-gray-500">{item.time}</p>
                                    </div>
                                    <Badge variant="outline" className="text-green-600 border-green-600">
                                        ✓ Success
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default OfflineSettings;
