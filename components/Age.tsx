"use client";
import { useMemo } from 'react'
import { differenceInYears } from 'date-fns'

export default function Age () {
  const age = useMemo(() => {
    return differenceInYears(Date.now(), new Date(1996, 7, 26))
  }, [])

  return age
}
