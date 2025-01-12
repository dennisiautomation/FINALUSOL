import React, { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';
import { Button } from '../ui/Button';
import { generateShareableLink } from '../../utils/sharing/generateShareableLink';
import { ProposalData } from '../../types/proposal';

interface ShareProposalButtonProps {
  proposal: ProposalData;
}

export function ShareProposalButton({ proposal }: ShareProposalButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const link = generateShareableLink(proposal);
    
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <Button 
      onClick={handleShare}
      variant={copied ? "secondary" : "primary"}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          Link Copiado!
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4 mr-2" />
          Compartilhar
        </>
      )}
    </Button>
  );
}