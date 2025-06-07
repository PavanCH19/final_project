import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    Search,
    Filter,
    BookmarkIcon,
    Play,
    Calendar as CalendarIcon,
    Bell,
    TrendingUp,
    Clock,
    Star,
    CheckCircle,
    AlertCircle,
    BarChart3,
    Target,
    Book,
    Video,
    FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LearningDashboard = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);

    const skillGaps = [
        { skill: 'React Hooks', currentLevel: 65, targetLevel: 90, priority: 'high' },
        { skill: 'System Design', currentLevel: 40, targetLevel: 85, priority: 'high' },
        { skill: 'Data Structures', currentLevel: 75, targetLevel: 90, priority: 'medium' },
        { skill: 'TypeScript', currentLevel: 55, targetLevel: 80, priority: 'medium' },
        { skill: 'Node.js', currentLevel: 45, targetLevel: 75, priority: 'low' }
    ];

    const resources = [
        {
            id: 1,
            title: 'Advanced React Patterns and Hooks',
            type: 'course',
            provider: 'TechAcademy',
            rating: 4.8,
            duration: '6 hours',
            difficulty: 'Advanced',
            category: 'frontend',
            completed: false,
            bookmarked: true,
            description: 'Master advanced React patterns including custom hooks, context optimization, and performance techniques.',
            skills: ['React Hooks', 'Performance'],
            trending: true
        },
        {
            id: 2,
            title: 'System Design Interview Guide',
            type: 'article',
            provider: 'Engineering Blog',
            rating: 4.9,
            duration: '45 min read',
            difficulty: 'Expert',
            category: 'system-design',
            completed: true,
            bookmarked: false,
            description: 'Comprehensive guide to acing system design interviews with real-world examples.',
            skills: ['System Design', 'Architecture'],
            trending: false
        },
        {
            id: 3,
            title: 'Data Structures & Algorithms Masterclass',
            type: 'video',
            provider: 'CodeMaster',
            rating: 4.7,
            duration: '12 hours',
            difficulty: 'Intermediate',
            category: 'algorithms',
            completed: false,
            bookmarked: true,
            description: 'Complete course covering all essential data structures and algorithms for technical interviews.',
            skills: ['Data Structures', 'Algorithms'],
            trending: true
        }
    ];

    const notifications = [
        { id: 1, type: 'new', message: 'New React 18 course available', time: '2 hours ago' },
        { id: 2, type: 'trending', message: 'System Design patterns article is trending', time: '5 hours ago' },
        { id: 3, type: 'recommendation', message: 'Based on your gaps: TypeScript fundamentals', time: '1 day ago' }
    ];

    const getResourceIcon = (type) => {
        switch (type) {
            case 'course': return <Book className="w-4 h-4" />;
            case 'video': return <Video className="w-4 h-4" />;
            case 'article': return <FileText className="w-4 h-4" />;
            default: return <Book className="w-4 h-4" />;
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'text-red-600';
            case 'medium': return 'text-yellow-600';
            case 'low': return 'text-green-600';
            default: return 'text-gray-600';
        }
    };

    const filteredResources = resources.filter(resource => {
        const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
        const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Learning Resources</h1>
                        <p className="text-muted-foreground">Personalized recommendations to bridge your skill gaps</p>
                    </div>
                    <div className="flex space-x-3">
                        <Button variant="outline" onClick={() => navigate('/')}>
                            Back to Dashboard
                        </Button>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Bell className="w-4 h-4" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className="space-y-3">
                                    <h4 className="font-semibold">Notifications</h4>
                                    {notifications.map(notification => (
                                        <div key={notification.id} className="text-sm space-y-1">
                                            <p>{notification.message}</p>
                                            <p className="text-xs text-muted-foreground">{notification.time}</p>
                                        </div>
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                {/* Skill Gap Analysis */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <BarChart3 className="w-5 h-5" />
                            <span>Skill Gap Analysis</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {skillGaps.map(skill => (
                                <div key={skill.skill} className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-medium">{skill.skill}</h4>
                                        <Badge variant={skill.priority === 'high' ? 'destructive' : skill.priority === 'medium' ? 'secondary' : 'outline'}>
                                            {skill.priority} priority
                                        </Badge>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Current: {skill.currentLevel}%</span>
                                            <span>Target: {skill.targetLevel}%</span>
                                        </div>
                                        <Progress value={skill.currentLevel} className="h-2" />
                                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                            <Target className="w-3 h-3" />
                                            <span>Gap: {skill.targetLevel - skill.currentLevel}%</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Search and Filters */}
                <Card className="mb-6">
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                <Input
                                    placeholder="Search resources..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="frontend">Frontend</SelectItem>
                                    <SelectItem value="backend">Backend</SelectItem>
                                    <SelectItem value="system-design">System Design</SelectItem>
                                    <SelectItem value="algorithms">Algorithms</SelectItem>
                                </SelectContent>
                            </Select>
                            <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="justify-start text-left font-normal">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {selectedDate ? selectedDate.toDateString() : "Pick a date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={setSelectedDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </CardContent>
                </Card>

                {/* Resource Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map(resource => (
                        <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center space-x-2">
                                        {getResourceIcon(resource.type)}
                                        <Badge variant="outline">{resource.type}</Badge>
                                        {resource.trending && (
                                            <Badge variant="secondary" className="flex items-center space-x-1">
                                                <TrendingUp className="w-3 h-3" />
                                                <span>Trending</span>
                                            </Badge>
                                        )}
                                    </div>
                                    <Button variant="ghost" size="sm">
                                        <BookmarkIcon className={`w-4 h-4 ${resource.bookmarked ? 'fill-current' : ''}`} />
                                    </Button>
                                </div>
                                <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground">{resource.description}</p>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">{resource.provider}</span>
                                    <div className="flex items-center space-x-1">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span>{resource.rating}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center text-sm">
                                    <div className="flex items-center space-x-1">
                                        <Clock className="w-4 h-4" />
                                        <span>{resource.duration}</span>
                                    </div>
                                    <Badge variant={resource.difficulty === 'Expert' ? 'destructive' : resource.difficulty === 'Advanced' ? 'secondary' : 'outline'}>
                                        {resource.difficulty}
                                    </Badge>
                                </div>

                                <div className="flex flex-wrap gap-1">
                                    {resource.skills.map(skill => (
                                        <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                                    ))}
                                </div>

                                <div className="flex space-x-2">
                                    <Button size="sm" className="flex-1">
                                        <Play className="w-4 h-4 mr-1" />
                                        Start
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <CalendarIcon className="w-4 h-4" />
                                    </Button>
                                    {resource.completed && (
                                        <div className="flex items-center text-green-600">
                                            <CheckCircle className="w-4 h-4" />
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Study Plan Alert */}
                <Alert className="mt-8">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        Based on your skill gaps, we recommend focusing on React Hooks and System Design this week.
                        <Button variant="link" className="p-0 h-auto ml-1">
                            View personalized study plan →
                        </Button>
                    </AlertDescription>
                </Alert>
            </div>
        </div>
    );
};

export default LearningDashboard; 