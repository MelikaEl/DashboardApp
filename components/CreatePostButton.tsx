import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface CreatePostButtonProps {
  link: string;
}

const CreatePostButton = ({ link }: CreatePostButtonProps) => {
  return (
    <>
      <Link href={link}>
        <Button className="bg-pink-400 hover:bg-pink-500">
          <PlusCircle className="w-4 h-4 mr-2" />
          Create Post
        </Button>
      </Link>
    </>
  );
};

export default CreatePostButton;
