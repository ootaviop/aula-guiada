import '../styles/TextSection.css';
import Paragraph from './Paragraph';

const TextSection = () => {
    return (
            <div className="text-section">
                <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Paragraph>
                <Paragraph>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Paragraph>
                <Paragraph>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</Paragraph>
                <Paragraph>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Paragraph>
            </div>
    );
}

export default TextSection;