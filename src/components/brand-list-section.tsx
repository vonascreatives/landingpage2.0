"use client";
import React from "react";
import Link from "next/link";

interface BrandListSectionProps {
  pages: Array<{
    uid: string;
    data: {
      title?: string;
      [key: string]: any;
    };
  }>;
}

export default function BrandListSection({ pages }: BrandListSectionProps) {
  if (!pages || pages.length === 0) {
    return null;
  }

  return (
    <div className="tp-brand-list-area pt-60 pb-120">
      <div className="container">
        <div className="row justify-content-center mb-60">
          <div className="col-xl-8">
            <div className="text-center">
              <h3 className="tp-section-title-90">Explore Our Brands</h3>
              <p>Discover our portfolio of brands and their unique stories</p>
            </div>
          </div>
        </div>
        <div className="row">
          {pages.map((page, index) => {
            // Extract title from slices or data
            const heroSlice = page.data.slices?.find(
              (s: any) => s.slice_type === "hero_section"
            );
            const title =
              heroSlice?.primary?.title?.[0]?.text ||
              page.data.title ||
              page.uid.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase());

            return (
              <div key={page.uid} className="col-xl-4 col-lg-6 col-md-6 mb-30">
                <div className="tp-brand-card">
                  <Link
                    href={`/${page.uid}`}
                    className="tp-brand-card-link"
                  >
                    <div className="tp-brand-card-content">
                      <h4 className="tp-brand-card-title">{title}</h4>
                      <span className="tp-brand-card-uid">{page.uid}</span>
                      <div className="tp-brand-card-arrow">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 17L17 7M17 7H7M17 7V17"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        .tp-brand-list-area {
          background: var(--tp-common-white);
        }
        .tp-brand-card {
          position: relative;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .tp-brand-card:hover {
          border-color: #19191A;
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        .tp-brand-card-link {
          display: block;
          padding: 40px 30px;
          text-decoration: none;
          color: inherit;
        }
        .tp-brand-card-content {
          position: relative;
        }
        .tp-brand-card-title {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 10px;
          color: #19191A;
        }
        .tp-brand-card-uid {
          display: inline-block;
          font-size: 14px;
          color: #666;
          padding: 4px 12px;
          background: #f5f5f5;
          border-radius: 4px;
        }
        .tp-brand-card-arrow {
          position: absolute;
          top: 0;
          right: 0;
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
        }
        .tp-brand-card:hover .tp-brand-card-arrow {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </div>
  );
}
