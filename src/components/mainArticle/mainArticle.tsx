import Image from "next/image";
import styles from "./styles.module.css";
import Link from "next/link";
import { Article } from "../../interfaces/Aricle";

export default function MainArticle(article: Article) {
  return (
    <Link href={`/articles/${article.documentId}`} className={styles.main}>
      {/* iamge */}
      <div className={styles.imageContainer}>
        <Image
          src={article.photo ? article.photo.url : "/aljazara.svg"}
          alt={
            article.photo && article.photo.alternativeText
              ? article.photo.alternativeText
              : "Picture text"
          }
          width={200}
          height={200}
          priority={true}
        />
      </div>
      {/* article title */}
      <div className={styles.titleContainer}>
        <h1>{article.title}</h1>
        {article.section ? (
          <p className={styles.badge}>{article.section?.titleAr}</p>
        ) : (
          ""
        )}
      </div>
    </Link>
  );
}
