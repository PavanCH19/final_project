import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

const TestCasePanel = ({ testCases, onTestCasesChange }) => {
    const [activeTab, setActiveTab] = useState('cases');
    const [customInput, setCustomInput] = useState('');

    const addTestCase = () => {
        const newTestCase = {
            input: '',
            expectedOutput: ''
        };
        onTestCasesChange([...testCases, newTestCase]);
    };

    const updateTestCase = (index, field, value) => {
        const updated = testCases.map((tc, i) =>
            i === index ? { ...tc, [field]: value } : tc
        );
        onTestCasesChange(updated);
    };

    const removeTestCase = (index) => {
        onTestCasesChange(testCases.filter((_, i) => i !== index));
    };

    return (
        <Card className="h-full border-0 rounded-none">
            <CardHeader className="border-b py-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Test Cases</CardTitle>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant={activeTab === 'cases' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setActiveTab('cases')}
                        >
                            Test Cases
                        </Button>
                        <Button
                            variant={activeTab === 'custom' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setActiveTab('custom')}
                        >
                            Custom Input
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0 h-[calc(100%-60px)]">
                <ScrollArea className="h-full">
                    {activeTab === 'cases' ? (
                        <div className="p-4 space-y-4">
                            {testCases.map((testCase, index) => (
                                <div key={index} className="border rounded-lg p-3 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Badge variant="outline">Test Case {index + 1}</Badge>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeTestCase(index)}
                                            className="text-destructive hover:text-destructive"
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-muted-foreground">Input:</label>
                                        <Textarea
                                            value={testCase.input}
                                            onChange={(e) => updateTestCase(index, 'input', e.target.value)}
                                            className="mt-1 text-xs font-mono"
                                            rows={2}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-muted-foreground">Expected Output:</label>
                                        <Textarea
                                            value={testCase.expectedOutput}
                                            onChange={(e) => updateTestCase(index, 'expectedOutput', e.target.value)}
                                            className="mt-1 text-xs font-mono"
                                            rows={2}
                                        />
                                    </div>
                                </div>
                            ))}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={addTestCase}
                                className="w-full"
                            >
                                Add Test Case
                            </Button>
                        </div>
                    ) : (
                        <div className="p-4">
                            <label className="text-sm font-medium text-muted-foreground">Custom Input:</label>
                            <Textarea
                                value={customInput}
                                onChange={(e) => setCustomInput(e.target.value)}
                                className="mt-2 font-mono text-sm"
                                rows={8}
                                placeholder="Enter your custom input here..."
                            />
                            <Button className="mt-3 w-full" size="sm">
                                Run with Custom Input
                            </Button>
                        </div>
                    )}
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default TestCasePanel; 