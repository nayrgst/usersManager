'use client';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

export function SocialButtons() {
  return (
    <section className="flex flex-col sm:flex-row w-full items-center justify-center gap-2">
      <Button className="w-full sm:flex-1 cursor-pointer" variant="outline">
        <FaGoogle size={20} />
      </Button>
      <Button className="w-full sm:flex-1 cursor-pointer" variant="outline">
        <FaGithub size={20} />
      </Button>
    </section>
  );
}
