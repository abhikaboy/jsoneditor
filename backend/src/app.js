import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import Realm from 'realm';

const app = express();

// Apply middlware for CORS and JSON endpoing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let realm;
const DocumentSchema = {
	name: 'Document',
	properties: {
		_id: 'string',
		data: 'string',
		schema: 'string',
	},
	primaryKey: '_id',
};
app.get('/', (req, res) => {
	res.send('Hello World!');
});
app.get('/data', (req, res) => {
	const { id } = req.query;
	const documents = realm.objects('Document');
	const [matchingDocument] = documents.filtered(`_id = '${id}'`);
	if (matchingDocument == undefined) {
		res.status(404);
		res.send({ data: 'not found' });
		return;
	}
	res.send(matchingDocument);
	// realm.write(() => {
	// 	realm.delete(matchingDocument);
	// });
});
app.post('/data', (req, res) => {
	const { id, data, schema } = req.body;
	console.log(req.body);
	console.log(id);
	console.log(data);
	console.log(schema);
	// write data to realm with id tag
	realm.write(() => {
		const document = realm.create('Document', {
			_id: id,
			data: data,
			schema: schema,
		});
		res.send(document._id);
	});
});
app.listen(3000, async () => {
	console.log(`Example app listening on port ${3000}!`);
	console.log('socket thing');
	realm = await Realm.open({
		path: 'myrealm2',
		schema: [DocumentSchema],
	});
});
