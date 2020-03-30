const axios = require('axios').default
const geocoding = require('./geocoding')

jest.mock('axios')

test('should resolve latitude/longitude', async () => {
  axios.get.mockResolvedValue({ data: sample })
  const response = await geocoding(-22.969051, -43.38668)
  // console.log(response)
  expect(response).not.toBeNull()
})

const sample = {
  plus_code: {
    compound_code: '2JJ7+98 Rio de Janeiro, State of Rio de Janeiro, Brazil',
    global_code: '589R2JJ7+98'
  },
  results: [
    {
      address_components: [
        {
          long_name: '40',
          short_name: '40',
          types: ['street_number']
        },
        {
          long_name: 'Rua Amilcar de Castro',
          short_name: 'R. Amilcar de Castro',
          types: ['route']
        },
        {
          long_name: 'Jacarepaguá',
          short_name: 'Jacarepaguá',
          types: ['political', 'sublocality', 'sublocality_level_1']
        },
        {
          long_name: 'Rio de Janeiro',
          short_name: 'Rio de Janeiro',
          types: ['administrative_area_level_2', 'political']
        },
        {
          long_name: 'Rio de Janeiro',
          short_name: 'RJ',
          types: ['administrative_area_level_1', 'political']
        },
        {
          long_name: 'Brazil',
          short_name: 'BR',
          types: ['country', 'political']
        },
        {
          long_name: '22775-053',
          short_name: '22775-053',
          types: ['postal_code']
        }
      ],
      formatted_address: 'R. Amilcar de Castro, 40 - Jacarepaguá, Rio de Janeiro - RJ, 22775-053, Brazil',
      geometry: {
        location: {
          lat: -22.9691012,
          lng: -43.3867225
        },
        location_type: 'ROOFTOP',
        viewport: {
          northeast: {
            lat: -22.96775221970849,
            lng: -43.38537351970849
          },
          southwest: {
            lat: -22.9704501802915,
            lng: -43.38807148029149
          }
        }
      },
      place_id: 'ChIJx3hlH2DZmwARxsHQScDY5NA',
      plus_code: {
        compound_code: '2JJ7+98 Rio de Janeiro, State of Rio de Janeiro, Brazil',
        global_code: '589R2JJ7+98'
      },
      types: ['street_address']
    },
    {
      address_components: [
        {
          long_name: '2000',
          short_name: '2000',
          types: ['street_number']
        },
        {
          long_name: 'Avenida Embaixador Abelardo Bueno',
          short_name: 'Av. Embaixador Abelardo Bueno',
          types: ['route']
        },
        {
          long_name: 'Barra da Tijuca',
          short_name: 'Barra da Tijuca',
          types: ['political', 'sublocality', 'sublocality_level_1']
        },
        {
          long_name: 'Rio de Janeiro',
          short_name: 'Rio de Janeiro',
          types: ['administrative_area_level_2', 'political']
        },
        {
          long_name: 'Rio de Janeiro',
          short_name: 'RJ',
          types: ['administrative_area_level_1', 'political']
        },
        {
          long_name: 'Brazil',
          short_name: 'BR',
          types: ['country', 'political']
        },
        {
          long_name: '22775-040',
          short_name: '22775-040',
          types: ['postal_code']
        }
      ],
      formatted_address:
        'Av. Embaixador Abelardo Bueno, 2000 - Barra da Tijuca, Rio de Janeiro - RJ, 22775-040, Brazil',
      geometry: {
        location: {
          lat: -22.9693765,
          lng: -43.3859088
        },
        location_type: 'ROOFTOP',
        viewport: {
          northeast: {
            lat: -22.9680275197085,
            lng: -43.3845598197085
          },
          southwest: {
            lat: -22.9707254802915,
            lng: -43.3872577802915
          }
        }
      },
      place_id: 'ChIJS96A-djbmwARCC5rbJm3Lyk',
      plus_code: {
        compound_code: '2JJ7+6J Rio de Janeiro, State of Rio de Janeiro, Brazil',
        global_code: '589R2JJ7+6J'
      },
      types: ['establishment', 'premise']
    },
    {
      address_components: [
        {
          long_name: '40',
          short_name: '40',
          types: ['street_number']
        },
        {
          long_name: 'Rua Amilcar de Castro',
          short_name: 'R. Amilcar de Castro',
          types: ['route']
        },
        {
          long_name: 'Jacarepaguá',
          short_name: 'Jacarepaguá',
          types: ['political', 'sublocality', 'sublocality_level_1']
        },
        {
          long_name: 'Rio de Janeiro',
          short_name: 'Rio de Janeiro',
          types: ['administrative_area_level_2', 'political']
        },
        {
          long_name: 'Rio de Janeiro',
          short_name: 'RJ',
          types: ['administrative_area_level_1', 'political']
        },
        {
          long_name: 'Brazil',
          short_name: 'BR',
          types: ['country', 'political']
        },
        {
          long_name: '22711',
          short_name: '22711',
          types: ['postal_code', 'postal_code_prefix']
        }
      ],
      formatted_address: 'R. Amilcar de Castro, 40 - Jacarepaguá, Rio de Janeiro - RJ, 22711, Brazil',
      geometry: {
        location: {
          lat: -22.9691063,
          lng: -43.3858937
        },
        location_type: 'RANGE_INTERPOLATED',
        viewport: {
          northeast: {
            lat: -22.9677573197085,
            lng: -43.3845447197085
          },
          southwest: {
            lat: -22.9704552802915,
            lng: -43.38724268029149
          }
        }
      },
      place_id:
        'EkRSLiBBbWlsY2FyIGRlIENhc3RybywgNDAgLSBKYWNhcmVwYWd1w6EsIFJpbyBkZSBKYW5laXJvIC0gUkosIEJyYXppbCIaEhgKFAoSCZnP_SNg2ZsAEfRWM_9SoVMmECg',
      types: ['street_address']
    },
    {
      address_components: [
        {
          long_name: '40-150',
          short_name: '40-150',
          types: ['street_number']
        },
        {
          long_name: 'Rua Amilcar de Castro',
          short_name: 'R. Amilcar de Castro',
          types: ['route']
        },
        {
          long_name: 'Jacarepaguá',
          short_name: 'Jacarepaguá',
          types: ['political', 'sublocality', 'sublocality_level_1']
        },
        {
          long_name: 'Rio de Janeiro',
          short_name: 'Rio de Janeiro',
          types: ['administrative_area_level_2', 'political']
        },
        {
          long_name: 'Rio de Janeiro',
          short_name: 'RJ',
          types: ['administrative_area_level_1', 'political']
        },
        {
          long_name: 'Brazil',
          short_name: 'BR',
          types: ['country', 'political']
        },
        {
          long_name: '22711',
          short_name: '22711',
          types: ['postal_code', 'postal_code_prefix']
        }
      ],
      formatted_address: 'R. Amilcar de Castro, 40-150 - Jacarepaguá, Rio de Janeiro - RJ, 22711, Brazil',
      geometry: {
        bounds: {
          northeast: {
            lat: -22.9682248,
            lng: -43.38588319999999
          },
          southwest: {
            lat: -22.9701292,
            lng: -43.3859012
          }
        },
        location: {
          lat: -22.969177,
          lng: -43.3858942
        },
        location_type: 'GEOMETRIC_CENTER',
        viewport: {
          northeast: {
            lat: -22.9678280197085,
            lng: -43.3845432197085
          },
          southwest: {
            lat: -22.9705259802915,
            lng: -43.3872411802915
          }
        }
      },
      place_id: 'ChIJmc_9I2DZmwAR9FYz_1KhUyY',
      types: ['route']
    },
    {
      address_components: [
        {
          long_name: '22711',
          short_name: '22711',
          types: ['postal_code', 'postal_code_prefix']
        },
        {
          long_name: 'Jacarepaguá',
          short_name: 'Jacarepaguá',
          types: ['political', 'sublocality', 'sublocality_level_1']
        },
        {
          long_name: 'Rio de Janeiro',
          short_name: 'Rio de Janeiro',
          types: ['administrative_area_level_2', 'political']
        },
        {
          long_name: 'State of Rio de Janeiro',
          short_name: 'RJ',
          types: ['administrative_area_level_1', 'political']
        },
        {
          long_name: 'Brazil',
          short_name: 'BR',
          types: ['country', 'political']
        }
      ],
      formatted_address: 'Jacarepaguá, Rio de Janeiro - State of Rio de Janeiro, 22711, Brazil',
      geometry: {
        bounds: {
          northeast: {
            lat: -22.9476643,
            lng: -43.377468
          },
          southwest: {
            lat: -22.9745799,
            lng: -43.4076273
          }
        },
        location: {
          lat: -22.9625663,
          lng: -43.3921967
        },
        location_type: 'APPROXIMATE',
        viewport: {
          northeast: {
            lat: -22.9476643,
            lng: -43.377468
          },
          southwest: {
            lat: -22.9745799,
            lng: -43.4076273
          }
        }
      },
      place_id: 'ChIJ2TyJjFvZmwARTJ_0mlPgR1w',
      types: ['postal_code', 'postal_code_prefix']
    },
    {
      address_components: [
        {
          long_name: 'Jacarepaguá',
          short_name: 'Jacarepaguá',
          types: ['political', 'sublocality', 'sublocality_level_1']
        },
        {
          long_name: 'Rio de Janeiro',
          short_name: 'Rio de Janeiro',
          types: ['administrative_area_level_2', 'political']
        },
        {
          long_name: 'State of Rio de Janeiro',
          short_name: 'RJ',
          types: ['administrative_area_level_1', 'political']
        },
        {
          long_name: 'Brazil',
          short_name: 'BR',
          types: ['country', 'political']
        }
      ],
      formatted_address: 'Jacarepaguá, Rio de Janeiro - State of Rio de Janeiro, Brazil',
      geometry: {
        bounds: {
          northeast: {
            lat: -22.9074696,
            lng: -43.2786814
          },
          southwest: {
            lat: -22.9822108,
            lng: -43.4729135
          }
        },
        location: {
          lat: -22.9681736,
          lng: -43.3907025
        },
        location_type: 'APPROXIMATE',
        viewport: {
          northeast: {
            lat: -22.9074696,
            lng: -43.2786814
          },
          southwest: {
            lat: -22.9822108,
            lng: -43.4729135
          }
        }
      },
      place_id: 'ChIJ344hID3YmwARtEhJWiFWaRg',
      types: ['political', 'sublocality', 'sublocality_level_1']
    },
    {
      address_components: [
        {
          long_name: 'Rio de Janeiro',
          short_name: 'Rio de Janeiro',
          types: ['administrative_area_level_2', 'political']
        },
        {
          long_name: 'State of Rio de Janeiro',
          short_name: 'RJ',
          types: ['administrative_area_level_1', 'political']
        },
        {
          long_name: 'Brazil',
          short_name: 'BR',
          types: ['country', 'political']
        }
      ],
      formatted_address: 'Rio de Janeiro - State of Rio de Janeiro, Brazil',
      geometry: {
        bounds: {
          northeast: {
            lat: -22.7460201,
            lng: -43.0990395
          },
          southwest: {
            lat: -23.0828927,
            lng: -43.7965385
          }
        },
        location: {
          lat: -22.9112301,
          lng: -43.4452148
        },
        location_type: 'APPROXIMATE',
        viewport: {
          northeast: {
            lat: -22.7460201,
            lng: -43.0990395
          },
          southwest: {
            lat: -23.0828927,
            lng: -43.7965385
          }
        }
      },
      place_id: 'ChIJC7UkQv5-mQAR7llshDwliPk',
      types: ['administrative_area_level_2', 'political']
    },
    {
      address_components: [
        {
          long_name: 'Rio de Janeiro',
          short_name: 'Rio de Janeiro',
          types: ['locality', 'political']
        },
        {
          long_name: 'Rio de Janeiro',
          short_name: 'Rio de Janeiro',
          types: ['administrative_area_level_2', 'political']
        },
        {
          long_name: 'State of Rio de Janeiro',
          short_name: 'RJ',
          types: ['administrative_area_level_1', 'political']
        },
        {
          long_name: 'Brazil',
          short_name: 'BR',
          types: ['country', 'political']
        }
      ],
      formatted_address: 'Rio de Janeiro, State of Rio de Janeiro, Brazil',
      geometry: {
        bounds: {
          northeast: {
            lat: -22.7460327,
            lng: -43.0969042
          },
          southwest: {
            lat: -23.0822288,
            lng: -43.7950599
          }
        },
        location: {
          lat: -22.9068467,
          lng: -43.1728965
        },
        location_type: 'APPROXIMATE',
        viewport: {
          northeast: {
            lat: -22.7460327,
            lng: -43.0969042
          },
          southwest: {
            lat: -23.0822288,
            lng: -43.7950599
          }
        }
      },
      place_id: 'ChIJW6AIkVXemwARTtIvZ2xC3FA',
      types: ['locality', 'political']
    },
    {
      address_components: [
        {
          long_name: 'State of Rio de Janeiro',
          short_name: 'RJ',
          types: ['administrative_area_level_1', 'political']
        },
        {
          long_name: 'Brazil',
          short_name: 'BR',
          types: ['country', 'political']
        }
      ],
      formatted_address: 'State of Rio de Janeiro, Brazil',
      geometry: {
        bounds: {
          northeast: {
            lat: -20.7632054,
            lng: -40.9568207
          },
          southwest: {
            lat: -23.3689318,
            lng: -44.8893205
          }
        },
        location: {
          lat: -22.9098755,
          lng: -43.2094971
        },
        location_type: 'APPROXIMATE',
        viewport: {
          northeast: {
            lat: -20.7632054,
            lng: -40.9568207
          },
          southwest: {
            lat: -23.3689318,
            lng: -44.8893205
          }
        }
      },
      place_id: 'ChIJw4riypQYmAAR0IMFwRrDSQM',
      types: ['administrative_area_level_1', 'political']
    },
    {
      address_components: [
        {
          long_name: 'Brazil',
          short_name: 'BR',
          types: ['country', 'political']
        }
      ],
      formatted_address: 'Brazil',
      geometry: {
        bounds: {
          northeast: {
            lat: 5.2717863,
            lng: -28.650543
          },
          southwest: {
            lat: -34.0891,
            lng: -73.9828169
          }
        },
        location: {
          lat: -14.235004,
          lng: -51.92528
        },
        location_type: 'APPROXIMATE',
        viewport: {
          northeast: {
            lat: 5.2717863,
            lng: -28.650543
          },
          southwest: {
            lat: -34.0891,
            lng: -73.9828169
          }
        }
      },
      place_id: 'ChIJzyjM68dZnAARYz4p8gYVWik',
      types: ['country', 'political']
    }
  ],
  status: 'OK'
}
