import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import swaggerAutogen from 'swagger-autogen'

const _dirname = dirname(fileURLToPath(import.meta.url));

const doc = {
    info: {
      title: 'MeetUps API',
      description: 'MeetUps API for practice'
    },

    definitions: {
      MeetUp: {
        theme_meet: 'theme_meet',
        description_meet: 'description_meet',
        tags: 'tags',
        locate_meet: 'locate_meet',
      },
      MeetUps: [
        {
          $ref: '#/definitions/MeetUp'
        }
      ],
      Text: {
        theme_meet: 'theme_meet',
        description_meet: 'description_meet',
        tags: 'tags',
        locate_meet: 'locate_meet',
      },
      Changes: {
        changes: {
            theme_meet: 'theme_meet',
            description_meet: 'description_meet',
            tags: 'tags',
            locate_meet: 'locate_meet',
        }
      }
    },
    host: 'localhost:3000/api/',
    schemes: ['http']
};

const outputFile = join(_dirname, 'output.json');

const endpointsFiles = [join(_dirname, '../routes/meetup.router.js')];

swaggerAutogen()(outputFile, endpointsFiles, doc).then(({ success }) => {
    console.log(`Generated: ${success}`);
})
