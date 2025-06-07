import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const ConsolePanel = ({ output, isRunning, onRunCode }) => {
    return (
        <Card className="h-full border-0 rounded-none">
            <CardHeader className="border-b py-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Console Output</CardTitle>
                    <Button
                        onClick={onRunCode}
                        disabled={isRunning}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                    >
                        {isRunning ? 'Running...' : 'Run Code'}
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-0 h-[calc(100%-60px)]">
                <ScrollArea className="h-full">
                    <div className="p-4 font-mono text-sm">
                        {output ? (
                            <pre className="whitespace-pre-wrap text-foreground">
                                {output}
                            </pre>
                        ) : (
                            <div className="text-muted-foreground italic">
                                Click "Run Code" to see output here...
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default ConsolePanel; 