import prisma from "../../../lib/prisma";
import { NextPage } from "next";
import Link from "next/link";
import { makeSerializable } from "../../../lib/util";
import { CorpusType } from "../../../lib/types";
import { FormEvent, useEffect, useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { router } from "next/client";

const CORPORA = gql`
    mutation CorpusCreate(
        $name: String!,
        $personal: Boolean!,
        $shared: Boolean!
    ) {
        corpusCreate(name: $name, personal: $personal, shared: $shared) {
            userErrors {
                message
            }
            id
        }
    }
`

const MyCorporaPage: NextPage<{ corpora: CorpusType[] }> = (props) => {
  const { corpora } = props
  const [corpusCreate, { data, loading }] = useMutation(CORPORA)

  const nameRef = useRef<HTMLInputElement>(null)
  const personalRef = useRef<HTMLInputElement>(null)
  const sharedRef = useRef<HTMLInputElement>(null)

  const list = corpora.map(corpus => {
    return (
      <li key={`corpus-${corpus.id}`}>
        <Link href={`/my/corpora/${corpus.id}`}>{corpus.name}</Link>
      </li>
    )
  })

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const name = nameRef.current?.value
    const personal = personalRef.current?.checked
    const shared = sharedRef.current?.checked

    corpusCreate({
      variables: { name, personal, shared }
    })
  }

  useEffect(() => {
    if (data) {
      if (data.corpusCreate.userErrors.length) {
        console.log(data.corpusCreate.userErrors);
      }
      if (data.corpusCreate.id) {
        router.push(`/my/corpora/${data.corpusCreate.id}`)
      }
    }
  }, [data])

  return (
    <>
      <h1>Corpora</h1>
      <ul>{list}</ul>
      <h2>Create a new corpus</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div>
            <label>
              <input name="name" required={true} ref={nameRef}/>
              <span>Name</span>
            </label>
          </div>

          <div>
            <label>
              <input type="checkbox" name="personal" ref={personalRef}/>
              <span>Personal</span>
            </label>
          </div>

          <div>
            <label>
              <input type="checkbox" name="shared" ref={sharedRef}/>
              <span>Shared</span>
            </label>
          </div>

          <div>
            <button>Create</button>
          </div>
        </fieldset>
      </form>
      {loading && <p>Loading...</p>}
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
