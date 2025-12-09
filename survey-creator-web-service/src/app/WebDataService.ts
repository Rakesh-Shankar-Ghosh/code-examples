const surveyListDataName = "SurveyJSExampleList";
const timeOutDelay = 300;
const newSurveyName = "New Survey";
const newSurveyJSON = {};
const emptySurveyJSON = { pages: [{}] };

type CallBackFunc = (...arg: any) => void;

// Get the survey list. Each object contains the following properties: `id`, `name`, and `json`
// export async function getSurveyItems(onCallback: CallBackFunc) {
//   setTimeout(() => {
//     onCallback(getSurveyItemsInternal());
//   }, timeOutDelay);
// }

// export function getSurveyItems(onCallback: CallBackFunc) {
//   setTimeout(() => {
//     (async () => {
//       const data = await getSurveyItemsInternal();
//       onCallback(data);
//     })();
//   }, timeOutDelay);
// }

export async function getSurveyItems(onCallback: CallBackFunc) {
  const data = await getSurveyItemsInternal();
  onCallback(data);
}




// Create a new survey and return it
export function createSurvey(onCallback: CallBackFunc) {
  setTimeout(() => {
    onCallback(createSurveyInternal());
  }, timeOutDelay);
}
// Delete a survey by `id` and return the updated survey list
export async function deleteSurvey(id: number, onCallback: CallBackFunc) {
  await deleteSurveyInternal(id);
  setTimeout(() => {
    onCallback(getSurveyItemsInternal());
  }, timeOutDelay);
}
// Get a survey JSON definition by survey `id`
export function getSurveyJSON(id: number, onCallback: CallBackFunc) {
  setTimeout(() => {
    onCallback(getSurveyJSONInternal(id));
  }, timeOutDelay);
}
// Get a survey name by survey `id`
export function getSurveyName(id: number, onCallback: CallBackFunc) {
  setTimeout(() => {
    onCallback(getSurveyNameInternal(id));
  }, timeOutDelay);
}
// Set a survey JSON definition by survey `id`
export function saveSurveyJSON(
  id: number,
  json: any,
  onCallback: CallBackFunc
) {
  setSurveyJSONInternal(id, json);
  setTimeout(() => {
    onCallback();
  }, timeOutDelay);
}
// Set a survey name by survey `id`
export function saveSurveyName(
  id: number,
  name: string,
  onCallback?: CallBackFunc
) {
  setSurveyNameInternal(id, name);
  if (!!onCallback) {
    setTimeout(() => {
      onCallback();
    }, timeOutDelay);
  }
}

var surveyData: any[];

function getSurveyItemsInternalOld(): any {
  if (!surveyData) {
    const str = window.localStorage.getItem(surveyListDataName) || "";
    surveyData = !!str ? JSON.parse(str) : [];
  }
  // return surveyData;
}

async function getSurveyItemsInternal(): Promise<any[]> {
  if (!surveyData) {
    try {
      const res = await fetch("http://localhost:3000/api/getActive", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      surveyData = data; // store in surveyData
      console.log("Fetched from DB:", surveyData);
      return surveyData;
    } catch (err) {
      console.error("DB fetch error:", err);
      surveyData = [];
      return surveyData;
    }
  } else {
    return surveyData;
  }
}

function setSurveyItemsInternal() {
  if (!!surveyData) {
    window.localStorage.setItem(surveyListDataName, JSON.stringify(surveyData));
  }
}
async function getSurveyJSONInternal(id: number) {
  const res = await getSurveyInfoInternal(id);
  return !!res && !isObjectEmpty(res.json) ? res.json : emptySurveyJSON;
}
async function setSurveyJSONInternalOld(id: number, json: any) {
  const res = await getSurveyInfoInternal(id);
  if (!!res) {
    res.json = json;
    setSurveyItemsInternal();
  }
}

// async function setSurveyJSONInternal(id: number, json: any) {
//   fetch("http://localhost:3000/api/update", {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: json,
//   })
//     .then((res) => res.json())
//     .then((data) => console.log("Saved to DB:", data)) // <-- added
//     .catch((err) => console.error("DB save error:", err));

//   const res = await getSurveyInfoInternal(id);
//   if (!!res) {
//     res.json = json;
//     setSurveyItemsInternal();
//   }
// }

async function setSurveyJSONInternal(id: number, json: any) {
  try {
    const response = await fetch(`http://localhost:3000/api/changeJson`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, json }), // send id in body
    });

    const data = await response.json();
    console.log("Saved to DB:", data);

    // Update local cache
    const res = await getSurveyInfoInternal(id);
    if (res) {
      res.json = json;
      setSurveyItemsInternal();
    }
  } catch (err) {
    console.error("DB save error:", err);
  }
}

async function getSurveyNameInternal(id: number) {
  const res = await getSurveyInfoInternal(id);
  return !!res ? res.name : "";
}
async function setSurveyNameInternal(id: number, name: string) {
  const res = await getSurveyInfoInternal(id);
  if (!!res) {
    res.name = name;
    setSurveyItemsInternal();
  }
}
async function createSurveyInternal() {
  var nextId = 1;
  const list = await getSurveyItemsInternal();
  for (var i = 0; i < list.length; i++) {
    if (list[i].id >= nextId) nextId = list[i].id + 1;
  }
  const newItem = { id: nextId, name: newSurveyName, json: newSurveyJSON };
  list.push(newItem);
  setSurveyItemsInternal();

  fetch("http://localhost:3000/api/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newItem),
  })
    .then((res) => res.json())
    .then((data) => console.log("Saved to DB:", data)) // <-- added
    .catch((err) => console.error("DB save error:", err)); // <-- added
  // ------------------------------------------------

  return newItem;
}
// async function deleteSurveyInternalOld(id: number) {
//   const list = await getSurveyItemsInternal();
//   for (var i = 0; i < list.length; i++) {
//     if (list[i].id === id) {

//       list.splice(i, 1);
//       break;
//     }
//   }
//   setSurveyItemsInternal();
// }

async function deleteSurveyInternal(id: number) {
  const res = await fetch(`http://localhost:3000/api/delete?id=${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  // setSurveyItemsInternal();

  const list = await getSurveyItemsInternal();
  for (var i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      list.splice(i, 1);
      break;
    }
  }
  setSurveyItemsInternal();
}

async function getSurveyInfoInternal(id: number) {
  const list = await getSurveyItemsInternal();
  for (var i = 0; i < list.length; i++) {
    if (list[i].id === id) return list[i];
  }
  return null;
}
function isObjectEmpty(obj: Object) {
  return (
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
}
