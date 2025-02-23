import Image from "next/image";
import ArticleCard from "../articleCard/page";
import styles from "./styles.module.css";
import Link from "next/link";
import { StrapiResponse } from "../../interfaces/StrapiResponse";

interface Props {
  listTitle: string;
  sectionURL: string;
  articlesList: StrapiResponse;
}

export default function ListArticles({ listTitle, sectionURL, articlesList }: Props) {
  return (
    <>
      <div className={styles.sectioTitle}>
        <h1>{listTitle}</h1>
        <Image src={"/chevronLeft.svg"} alt='chevron icon' width={18} height={18} />
      </div>
      <div className={styles.articlesList}>
        {articlesList.data.map((a) => (
          <ArticleCard key={a.documentId} article={a} borderTop={true} />
        ))}
        <div className={styles.readMoreBtnContainer}>
          <Link className={styles.readMoreBtn} href={`/${sectionURL}`}>
            إقرأ المزيد
          </Link>
        </div>
      </div>
    </>
  );
}
