import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const QuestionPanel = () => {
    const question = {
        title: "Two Sum",
        difficulty: "Easy",
        description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
        examples: [
            {
                input: "nums = [2,7,11,15], target = 9",
                output: "[0,1]",
                explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
            },
            {
                input: "nums = [3,2,4], target = 6",
                output: "[1,2]",
                explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
            }
        ],
        constraints: [
            "2 <= nums.length <= 10^4",
            "-10^9 <= nums[i] <= 10^9",
            "-10^9 <= target <= 10^9",
            "Only one valid answer exists."
        ]
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty.toLowerCase()) {
            case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    return (
        <Card className="flex-1 border-0 rounded-none">
            <CardHeader className="border-b py-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Problem Statement</CardTitle>
                    <Badge className={getDifficultyColor(question.difficulty)}>
                        {question.difficulty}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="p-0 h-[calc(100%-60px)]">
                <ScrollArea className="h-full">
                    <div className="p-4 space-y-6">
                        <div>
                            <h2 className="text-lg font-semibold mb-3">{question.title}</h2>
                            <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                                {question.description}
                            </p>
                        </div>

                        <div>
                            <h3 className="font-medium mb-3">Examples</h3>
                            {question.examples.map((example, index) => (
                                <div key={index} className="mb-4 p-3 bg-muted/50 rounded-lg">
                                    <div className="font-medium text-sm mb-1">Example {index + 1}:</div>
                                    <div className="text-sm space-y-1">
                                        <div><span className="font-medium">Input:</span> {example.input}</div>
                                        <div><span className="font-medium">Output:</span> {example.output}</div>
                                        <div><span className="font-medium">Explanation:</span> {example.explanation}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div>
                            <h3 className="font-medium mb-3">Constraints</h3>
                            <ul className="text-sm space-y-1">
                                {question.constraints.map((constraint, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-muted-foreground mr-2">•</span>
                                        <span className="font-mono text-xs">{constraint}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default QuestionPanel; 