import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const CodeEditor = ({ language, code, onChange }) => {
    const [lineNumbers, setLineNumbers] = useState(true);

    const getLanguageTemplate = (lang) => {
        switch (lang) {
            case 'python':
                return '# Write your Python solution here\ndef solution():\n    pass\n\n';
            case 'javascript':
                return '// Write your JavaScript solution here\nfunction solution() {\n    // Your code here\n}\n\n';
            case 'java':
                return '// Write your Java solution here\npublic class Solution {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}\n\n';
            case 'cpp':
                return '// Write your C++ solution here\n#include <iostream>\nusing namespace std;\n\nint main() {\n    // Your code here\n    return 0;\n}\n\n';
            default:
                return '// Write your code here\n\n';
        }
    };

    const handleTemplateReset = () => {
        onChange(getLanguageTemplate(language));
    };

    const formatCode = () => {
        // Simple code formatting (in a real app, you'd use a proper formatter)
        const formatted = code
            .split('\n')
            .map(line => line.trim())
            .join('\n');
        onChange(formatted);
    };

    return (
        <Card className="h-full border-0 rounded-none">
            <CardHeader className="border-b py-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                        Code Editor ({language.toUpperCase()})
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleTemplateReset}
                        >
                            Reset Template
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={formatCode}
                        >
                            Format Code
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0 h-[calc(100%-60px)]">
                <div className="flex h-full">
                    {lineNumbers && (
                        <div className="w-12 bg-muted/30 border-r text-sm text-muted-foreground p-2 font-mono">
                            {code.split('\n').map((_, index) => (
                                <div key={index} className="h-6 leading-6 text-right pr-2">
                                    {index + 1}
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="flex-1">
                        <Textarea
                            value={code}
                            onChange={(e) => onChange(e.target.value)}
                            className="h-full border-0 resize-none rounded-none font-mono text-sm leading-6 focus-visible:ring-0"
                            placeholder="Start coding here..."
                            style={{ minHeight: '100%' }}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CodeEditor; 