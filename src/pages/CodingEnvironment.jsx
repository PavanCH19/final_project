import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CodeEditor from '@/components/codingEnvironment/CodeEditor';
import ConsolePanel from '@/components/codingEnvironment/ConsolePanel';
import TestCasePanel from '@/components/codingEnvironment/TestCasePanel';
import TimerPanel from '@/components/codingEnvironment/TimerPanel';
import QuestionPanel from '@/components/codingEnvironment/QuestionPanel';
import ThemeToggle from '@/components/codingEnvironment/ThemeToggle';
import LanguageSelector from '@/components/codingEnvironment/LanguageSelector';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SidebarPageWrapper, SidebarTrigger } from "@/components/ui/sidebar";

const CodingEnvironment = () => {
    const navigate = useNavigate();
    const [selectedLanguage, setSelectedLanguage] = useState('python');
    const [code, setCode] = useState('# Write your solution here\n\n');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [testCases, setTestCases] = useState([
        { input: '5\n1 2 3 4 5', expectedOutput: '15' },
        { input: '3\n10 20 30', expectedOutput: '60' }
    ]);

    const handleRunCode = async () => {
        setIsRunning(true);
        // Simulate code execution
        setTimeout(() => {
            setOutput(`Running ${selectedLanguage} code...\n\nOutput:\n15\n\nExecution completed successfully.`);
            setIsRunning(false);
        }, 2000);
    };

    return (
        <SidebarPageWrapper noMargin>
            {/* Header */}
            <header className="border-b bg-card">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                        <SidebarTrigger className="mr-2" />
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate('/')}
                            className="flex items-center space-x-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span>Back to Dashboard</span>
                        </Button>
                        <h1 className="text-xl font-semibold">Live Coding Environment</h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <LanguageSelector
                            selectedLanguage={selectedLanguage}
                            onLanguageChange={setSelectedLanguage}
                        />
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex h-[calc(100vh-73px)]">
                {/* Left Panel - Question and Timer */}
                <div className="w-1/3 border-r bg-card flex flex-col">
                    <TimerPanel />
                    <QuestionPanel />
                </div>

                {/* Right Panel - Code Editor and Console */}
                <div className="flex-1 flex flex-col">
                    {/* Code Editor */}
                    <div className="flex-1 border-b">
                        <CodeEditor
                            language={selectedLanguage}
                            code={code}
                            onChange={setCode}
                        />
                    </div>

                    {/* Bottom Panel - Console and Test Cases */}
                    <div className="h-80 flex">
                        <div className="flex-1 border-r">
                            <ConsolePanel
                                output={output}
                                isRunning={isRunning}
                                onRunCode={handleRunCode}
                            />
                        </div>
                        <div className="w-96">
                            <TestCasePanel
                                testCases={testCases}
                                onTestCasesChange={setTestCases}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </SidebarPageWrapper>
    );
};

export default CodingEnvironment; 