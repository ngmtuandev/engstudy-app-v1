import axios from '../untils/configAxios'
export function useVocabulary() {
  const fetchAddVocabulary = (data, token) => 
  {
    console.log('data adđ voca tokennn', token)
    const datavoca = axios({
    url: '/vocabulary/create-voca',
    method: "post",
    data,
    headers: {
      author: `Bearer ${JSON.parse(token)}`
    }
  })
  return datavoca
  }

  const fetchListVocabulary = (token) => 
  {
    const datavoca = axios({
    url: '/vocabulary/all-voca',
    method: "get",
    headers: {
      author: `Bearer ${JSON.parse(token)}`
    }
  })
  return datavoca
  }

  const fetchListVocabularyNoLearned = (token) => 
  {
    const datavocalearning = axios({
    url: '/vocabulary/voca-learn',
    method: "get",
    headers: {
      author: `Bearer ${JSON.parse(token)}`
    }
  })
  return datavocalearning
  }


  const fetchLearnVoca = (voca, token) => 
  {
    const learnVoca = axios({
    url:`/vocabulary/${voca}`,
    method: "put",
    headers: {
      author: `Bearer ${JSON.parse(token)}`
    }
  })
  return learnVoca
  }

  return {
    fetchAddVocabulary,fetchListVocabulary, fetchListVocabularyNoLearned, fetchLearnVoca
  };
}