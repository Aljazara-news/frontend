import styles from "./styles.module.css";
import { SectionHeader } from "../../../components/sectionHeader/sectionHeader";
import { getArticleByDocumentId, getArticlesBySection } from "../../../data/articlePageLoaders";
import { StrapiResponse, StrapiResponseSingle } from "../../../interfaces/StrapiResponse";
import Image from "next/image";
import moment from "moment";
import "moment/locale/ar";
import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";
import Link from "next/link";
import ListArticles from "../../../components/listArticles/page";

moment.locale("ar");

export default async function ArticlePage({ params }: { params: Promise<{ documentId: string }> }) {
  const paramsResult = await params;
  const width_height = 21;

  // get the article by document id
  const articleByDocumentId: StrapiResponseSingle = await getArticleByDocumentId(paramsResult.documentId);
  const article = articleByDocumentId.data;
  const content: BlocksContent = articleByDocumentId.data.content ?? [];
  let relativeArticles: StrapiResponse = { data: [], meta: "meta" };

  if (article.title) {
    relativeArticles = await getArticlesBySection(article.section?.title ?? "");
    // console.log(relativeArticles);
  }

  // get articles in the same section
  // get mixed news

  return (
    <div className={styles.main}>
      {article.title ? <SectionHeader title={article.title} /> : ""}

      <div className={styles.container}>
        <div className={styles.mainContainer}>
          <div>
            <div className={styles.imageContainer}>
              <Image
                src={article.photo ? article.photo.url : "/aljazara.svg"}
                alt={article.photo && article.photo.alternativeText ? article.photo.alternativeText : "Picture text"}
                width={200}
                height={200}
                priority={true}
              />
            </div>
            <p className={styles.imageCaption}>{article.photo?.caption}</p>
          </div>

          <div className={styles.contentContainer}>
            <div className={styles.createdAtContainer}>
              <p>{moment(article.createdAt).format("LLLL")}</p>
            </div>

            {/* ad */}

            {/*  */}
            <div className={styles.content}>
              <BlocksRenderer content={content}></BlocksRenderer>
            </div>

            <div className={styles.socialLinks}>
              <Link href={"#"}>
                <Image src='/fb-icon.svg' alt='' width={width_height} height={width_height} loading='eager' />
              </Link>
              <Link href={"#"}>
                <Image src='/x-icon.svg' alt='' width={width_height} height={width_height} loading='eager' />
              </Link>
              <Link href={"#"}>
                <Image src='/email-icon.svg' alt='' width={width_height} height={width_height} loading='eager' />
              </Link>
              <Link href={"#"}>
                <Image src='/whatsapp-icon.svg' alt='' width={width_height} height={width_height} loading='eager' />
              </Link>
              <Link href={"#"}>
                <Image src='/link-icon.svg' alt='' width={width_height} height={width_height} loading='eager' />
              </Link>

              <div className={styles.socialLinksText}>
                <p>شارك المقالة</p>
                <Image src='/chevronLeft.svg' alt='' width={width_height} height={width_height} loading='eager' />
              </div>
            </div>

            <div className={styles.moreNewsSection}>
              {relativeArticles && (
                <ListArticles
                  listTitle={`المزيد من أخبار ال${article.section?.titleAr ?? ""}`}
                  sectionURL={article.section?.title ?? "#"}
                  articlesList={relativeArticles}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
