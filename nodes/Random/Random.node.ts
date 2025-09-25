import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class Random implements INodeType{
	description: INodeTypeDescription = {
		displayName: 'Random',
		name: 'random',
		icon: 'file: dice.svg',
		group: ['transform'],
		version: 1,
		description: 'Node básico para gerar um número inteiro aleatório em um range.',
		defaults: {
			name: 'Random',
		},
		inputs: ['main'],
		outputs: ['main'],
		usableAsTool: true,
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'True Random Number Generator',
						value: 'generate',
					},
				],
				default: 'generate',
			},
			{
				displayName: 'Min',
				name: 'min',
				type: 'number',
				default: 1,
				description: 'Valor mínimo a ser gerado',
				displayOptions: {
					show: {
						operation: ['generate'],
					},
				},
			},
			{
				displayName: 'Max',
				name: 'max',
				type: 'number',
				default: 60,
				description: 'Valor máximo a ser gerado',
				displayOptions: {
					show: {
						operation: ['generate'],
					},
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const min = this.getNodeParameter('min', i) as number;
			const max = this.getNodeParameter('max', i) as number;

			const response = await this.helpers.request({
				method: 'GET',
				url: `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`,
			});

			const randomNumber = parseInt(response.trim());

			returnData.push({
				json: {
					randomNumber,
					min,
					max,
				},
				pairedItem: i,
			});
		}

		return [returnData];
	}
}
