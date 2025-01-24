import Image from "next/image";

type XLinkProps = {
    username: string; // Explicitly define username as a string
  };

  const XLink: React.FC<XLinkProps> = ({ username }) => {
    return (
      <a
        href={`https://x.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
      >
        <Image
          src="https://cdn.simpleicons.org/x/black"
          alt="X Logo"
          width={24}
          height={24}
          style={{ marginRight: '8px' }}
        />
        @{username}
      </a>
    );
  };

  export default XLink;

  