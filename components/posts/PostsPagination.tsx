"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { subscribeToPosts } from "@/app/firebase/firestoreoperations";

interface PostsPaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  postsPerPage: number;
}
const PostsPagination = ({
  currentPage,
  setCurrentPage,
  postsPerPage,
}: PostsPaginationProps) => {
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    const unsubscribe = subscribeToPosts((posts) => {
      setTotalPosts(posts.length);
    });

    return () => unsubscribe();
  }, []);

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // Generate page numbers array
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePrevious}
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>

        {pageNumbers.map((number) => (
          <PaginationItem key={number}>
            <PaginationLink
              onClick={() => setCurrentPage(number)}
              isActive={currentPage === number}
              className="cursor-pointer"
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={handleNext}
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PostsPagination;
