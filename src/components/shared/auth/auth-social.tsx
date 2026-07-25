import {Button} from "@/components/ui";

export const AuthSocial = () => {
  const handleProviderButtonClick = (providerName: string) => {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const apiUrl = import.meta.env.VITE_PUBLIC_API_URL;
    
    window.location.href = `${serverUrl}${apiUrl}/auth/oauth/connect/${providerName}`;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button
          onClick={() => handleProviderButtonClick('github')}
          className="flex-1 border"
          variant="outline"
        >
          <img
            className="w-6 h-6"
            src="https://github.githubassets.com/favicons/favicon.svg"
          />
          GitHub
        </Button>

        <Button
          onClick={() => handleProviderButtonClick('google')}
          className="flex-1 border"
          variant="outline"
        >
          <img
            className="w-6 h-6"
            src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
          />
          Google
        </Button>
      </div>
    </div>
  );
}