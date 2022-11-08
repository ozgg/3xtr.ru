import prisma from "../../../lib/prisma";
import { NextPage } from "next";
import Link from "next/link";
import { makeSerializable } from "../../../lib/util";
import { CorpusType } from "../../../lib/types";

const MyCorporaPage: NextPage<{corpora: CorpusType[]}> = (props) => {
  const { corpora } = props

  const list = corpora.map(corpus => {
    return (
      <li key={`corpus-${corpus.id}`}>
        <Link href={`/my/corpora/${corpus.id}`}>{corpus.name}</Link>
      </li>
    )
  })

  return (
    <>
      <h1>Corpora</h1>
      <ul>{list}</ul>
    </>
  )
}

export const getServerSideProps = async () => {
  const corpora = await prisma.corpus.findMany()

  return {
    props: {
      corpora: makeSerializable(corpora)
    }
  }
}

export default MyCorporaPage
