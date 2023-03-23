import { GetServerSideProps, NextPage } from "next";
import prisma from "../../../../lib/prisma";
import { makeSerializable } from "../../../../lib/util";
import { CorpusType } from "../../../../lib/types";

const MyCorpusPage: NextPage<{ corpus: CorpusType }> = (props) => {
  const { corpus } = props

  return (
    <>
      <h1>{corpus.name}</h1>
      <p>{corpus.personal && 'Personal'}</p>
      <p>{corpus.shared && 'Shared'}</p>
      <p>Created at {corpus.createdAt}</p>
      <p>Updated at {corpus.updatedAt}</p>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const corpus = await prisma.corpus.findUnique({
    where: { id: Number(context.params?.id) }
  })

  return {
    props: {
      corpus: { ...makeSerializable(corpus) }
    }
  }
}

export default MyCorpusPage
