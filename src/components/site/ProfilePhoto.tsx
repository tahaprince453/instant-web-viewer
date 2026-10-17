import { useState } from "react";
import profileAsset from "@/assets/taha-profile-2026.jpg.asset.json";
import previousAsset from "@/assets/taha-profile-live.jpg.asset.json";

// Use the verified public asset host, independent of the published site's proxy.
const assetOrigin = "https://id-preview--95f41c22-5354-4326-81c0-9a5e2fe278fd.lovable.app";
export const profilePhotoUrl = new URL(profileAsset.url, assetOrigin).href;
const previousPhotoUrl = new URL(previousAsset.url, assetOrigin).href;

/**
 * Public CDN photo with the previous upload as a network-error fallback.
 */
export function ProfilePhoto() {
  const [usePrevious, setUsePrevious] = useState(false);
  return (
    <img
      src={usePrevious ? previousPhotoUrl : profilePhotoUrl}
      alt="Taha Amjad — AI Automation Specialist"
      className="h-full w-full object-cover object-center transition-transform duration-700 ease-out hover:scale-110"
      loading="eager"
      width={1024}
      height={1024}
      fetchPriority="high"
      onError={() => {
        if (!usePrevious) setUsePrevious(true);
      }}
    />
  );
}
