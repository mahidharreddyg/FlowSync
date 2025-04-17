import { AudioWaveform } from "lucide-react";
import { Link } from "react-router-dom";

interface LogoProps {
  url?: string; // made optional in case you want to skip linking
}

const Logo: React.FC<LogoProps> = ({ url }) => {
  const content = (
    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
      <AudioWaveform className="size-4" />
    </div>
  );

  return url ? <Link to={url}>{content}</Link> : content;
};

export default Logo;
