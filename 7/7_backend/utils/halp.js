const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

const max = blogs.filter(x =>
    Math.max(...blogs.map(x => x.likes))
    === x.likes)

const reducer = (a, b) => {
    if(a.author === b.author)
    return a === b
}

const mostblogs = blogs.map(x => x.author).reduce(reducer)

var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
var authors = blogs.map(x => x.author)
var countedNames = authors.reduce(function (allNames, name) { 
  if (name in allNames) {
    allNames[name]++
  }
  else {
    allNames[name] = 1;
  }
  return allNames;
}, {});
var arr = new Array()
for(name in countedNames)
{
    const nameObj = {
        name: name,
        count: countedNames[name]
    }
   arr.push(nameObj) 
}

    var arr = new Array()

    var authors = ['seppo', 'keppo' , 'seppo', 'jaska']
    var counted = authors.reduce(function (allNames, name) {
        if (name in allNames) 
        {
            console.log(name)
            allNames[name]++
        }
        return allNames
    }, {})
    for (name in counted) {
        arr.push({
            name: name,
            count: counted[name]
        })
    }
    console.log(authors)
    return arr.find(x => x.count === Math.max(...arr.map(x => x.count)))

console.log(mostBlogs(blogs))
