import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Globe } from 'lucide-react';

const languages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
    { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
];

const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const currentLanguage = languages.find(lang => lang.code === selectedLanguage) || languages[0];

    const handleLanguageSelect = (languageCode) => {
        onLanguageChange(languageCode);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className="flex items-center space-x-2 min-w-[140px] justify-between hover:bg-gray-50 transition-colors"
                        aria-label={`Current language: ${currentLanguage.name}`}
                    >
                        <div className="flex items-center space-x-2">
                            <span className="text-lg" role="img" aria-label={`${currentLanguage.name} flag`}>
                                {currentLanguage.flag}
                            </span>
                            <span className="font-medium">{currentLanguage.name}</span>
                        </div>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    className="w-56 max-h-80 overflow-y-auto bg-white shadow-lg border border-gray-200 rounded-lg"
                    sideOffset={4}
                >
                    <div className="p-2">
                        <div className="flex items-center space-x-2 px-2 py-1 text-sm text-gray-500 border-b border-gray-100 mb-2">
                            <Globe className="h-4 w-4" />
                            <span>Select Language</span>
                        </div>

                        {languages.map((language) => (
                            <DropdownMenuItem
                                key={language.code}
                                onClick={() => handleLanguageSelect(language.code)}
                                className={`flex items-center space-x-3 px-3 py-2 rounded-md cursor-pointer transition-colors ${selectedLanguage === language.code
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'hover:bg-gray-50'
                                    }`}
                                role="menuitem"
                                aria-selected={selectedLanguage === language.code}
                            >
                                <span className="text-lg" role="img" aria-label={`${language.name} flag`}>
                                    {language.flag}
                                </span>
                                <div className="flex-1">
                                    <div className="font-medium">{language.name}</div>
                                    <div className="text-sm text-gray-500">{language.nativeName}</div>
                                </div>
                                {selectedLanguage === language.code && (
                                    <div className="w-2 h-2 bg-blue-600 rounded-full" aria-hidden="true" />
                                )}
                            </DropdownMenuItem>
                        ))}
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default LanguageSelector; 