import json
import db
import traceback
isDebug=True

def lambda_handler(event, context):
    try:
        if type(event) == dict:
            dic = event['queryStringParameters']
        else:
            dic = json.loads(event.replace("False", '"False"').replace("'", '"'))[
                'queryStringParameters']

        if dic['sid'] in [0, '0']:
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Origin': 'https://www.example.com',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': 'success',
            }

        print(dic)
        method = dic.pop('method')
        if method == 'add':
            dic['primary_key'] = '-'.join([str(x) for x in dic.values()])
            db.Add(dic)
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': 'success'
            }
        elif method == 'pick':
            res = db.Pick(dic)
            print(res)
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': json.dumps(res)
            }
        elif method == 'delete':
            Delete(dic['primary_key'])
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': json.dumps('success')
            }
    except Exception as e:
        if isDebug:
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': json.dumps(str(event))
            }
        else:
            return {
                'statusCode': 500,
                'headers': {
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': json.dumps(''.join(traceback.TracebackException.from_exception(e).format()))
            }
            
