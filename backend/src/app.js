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
		realm.create('Document', {
			_id: id,
			data: data,
			schema: schema,
		});
	});
	res.send('success');
});
app.get('/polyfills.8320e857ed655cc7.js', (req, res) => {
	res.sendFile(process.cwd()+"/frontend/dist/json-talk-soft/polyfills.8320e857ed655cc7.js")
});
app.get('/main.bb7d5f6b9eab4dd9.js', (req, res) => {
	res.sendFile(process.cwd()+"/frontend/dist/json-talk-soft/main.bb7d5f6b9eab4dd9.js")
});
app.get('/runtime.777f0d0da344fedd.js', (req, res) => {
	res.sendFile(process.cwd()+"/frontend/dist/json-talk-soft/runtime.777f0d0da344fedd.js")
});
app.get('/styles.bef8f1cd7a2c82a5.css', (req, res) => {
	res.sendFile(process.cwd()+"/frontend/dist/json-talk-soft/styles.bef8f1cd7a2c82a5.css")
});
app.get('/', (req, res) => {
	res.sendFile(process.cwd()+"/frontend/dist/json-talk-soft/index.html")
});
app.listen(3000, async () => {
	console.log(`Example app listening on port ${3000}!`);
	console.log('socket thing');
	realm = await Realm.open({
		path: 'myrealm2',
		schema: [DocumentSchema],
	});
});
