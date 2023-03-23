import { GetServerSideProps, NextPage } from "next";
import prisma from "../../../../lib/prisma";
import { makeSerializable } from "../../../../lib/util";
import { CorpusType } from "../../../../lib/types";
import { FormEvent, useEffect, useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const TEXT_SAMPLES = gql`
    mutation TextSampleCreate($textSample: TextSampleInput) {
        textSampleCreate(textSample: $textSample) {
            userErrors {
                message
            }
            textSample {
                id
            }
        }
    }
`

const MyCorpusPage: NextPage<{ corpus: CorpusType }> = (props) => {
  const { corpus } = props
  const bodyRef = useRef<HTMLTextAreaElement>(null)
  const [textSampleCreate, { data, loading }] = useMutation(TEXT_SAMPLES)
  const router = useRouter()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const body = bodyRef.current?.value

    console.log(body, corpus.id)
    textSampleCreate({
      variables: { textSample: { body, corpusId: corpus.id } }
    }).then(() => {
      console.log('Done')
    })

  }

  useEffect(() => {
    if (data) {
      if (data.textSampleCreate.userErrors.length) {
        console.log(data.textSampleCreate.userErrors);
      }
      if (data.textSampleCreate.textSample) {
        console.log('Created text Sample ' + data.textSampleCreate.textSample.id)
        // router.push(`/my/corpora/${corpus.id}/texts`)
      }
    }
  }, [data])

  return (
    <>
      <h1>{corpus.name}</h1>
      <p>{corpus.personal && 'Personal'}</p>
      <p>{corpus.shared && 'Shared'}</p>
      <p>Created at {corpus.createdAt}</p>
      <p>Updated at {corpus.updatedAt}</p>
      <h2>Add text</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div><label htmlFor="text-body">Text</label></div>
          <div>
            <textarea
              id="text-body"
              name="body"
              cols={80}
              rows={25}
              ref={bodyRef}
              minLength={10}
              maxLength={5000}
              required={true}
            ></textarea>
          </div>
          <div>
            <button>Submit</button>
          </div>
        </fieldset>
      </form>
      {loading && <p>Loading...</p>}
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
